import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

export async function POST(req: NextRequest) {
  let supabase;
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or key is missing');
    }

    supabase = createClient(supabaseUrl, supabaseKey);

    const { fileUrl, fileKey } = await req.json();
    console.log('Received request for fileKey:', fileKey, 'fileUrl:', fileUrl);

    // Construct the Lambda function URL with the file URL as a query parameter
    const lambdaUrl = `${process.env.AWS_LAMBDA_URL}?url=${encodeURIComponent(fileUrl)}`;
    console.log('Calling Lambda URL:', lambdaUrl);

    // Call AWS Lambda function
    const lambdaResponse = await axios.get(lambdaUrl);
    const enrichedData = lambdaResponse.data;
    console.log('Received enriched data:', JSON.stringify(enrichedData).slice(0, 200) + '...');

    // First, try to select the record using the key
    let { data: existingRecord, error: selectError } = await supabase
      .from('File')
      .select('*')
      .eq('key', fileKey)
      .single()

    console.log('Existing record:', existingRecord);

    if (selectError) {
      console.error('Error selecting record:', selectError);
      return NextResponse.json({ success: false, error: 'Error selecting record' }, { status: 500 });
    }

    if (!existingRecord) {
      console.log('Record not found');
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    // Store the enriched data in Supabase
    const { data, error } = await supabase
      .from('File')
      .update({ enrich_data: enrichedData })
      .eq('key', fileKey)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Updated Supabase record:', data);

    return NextResponse.json({ success: true, data: enrichedData });
    
  } catch (error) {
    console.error('Error in enrichment process:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Enrichment process failed'
    }, { status: 500 });
  }
}
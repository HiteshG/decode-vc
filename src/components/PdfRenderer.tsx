"use client";

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
  Copy
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { zenburn,arta,docco, an_old_hope, darcula, prism, } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";

import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";


import SimpleBar from "simplebar-react";
import PdfFullScreen from "./PdfFullScreen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}

SyntaxHighlighter.registerLanguage('json', json);


const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast();
  
  const [enrichmentStatus, setEnrichmentStatus] = useState<'loading' | 'complete' | null>(null);
  const [enrichmentData, setEnrichmentData] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const { width, ref } = useResizeDetector();

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  useEffect(() => {
    const fetchEnrichmentData = async () => {
      setEnrichmentStatus('loading');
      try {
        // Replace this with your actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // const response = await fetch('/api/enrich-data');
        const response = await fetch('/dummy.json');
        const data = await response.json();
        setEnrichmentData(data);
        setEnrichmentStatus('complete');
      } catch (error) {
        console.error('Error fetching enrichment data:', error);
        setEnrichmentStatus(null);
      }
    };

    fetchEnrichmentData();
  }, []);

  const handleCopyClick = () => {
    if (enrichmentData) {
      navigator.clipboard.writeText(JSON.stringify(enrichmentData, null, 2));
      toast({
        title: "Success",
        description: "Data copied to clipboard!",
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-row items-stretch">
      
      <div className="flex-1">
        <div className="h-12 w-full border-b border-zinc-200 flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            <Button
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
                setValue("page", String(currentPage - 1));
              }}
              variant="ghost"
              aria-label="previous page"
            >
              <ChevronDown className="h-3 w-3" />
            </Button>

            <div className="flex items-center gap-1">
              <Input
                {...register("page")}
                className={cn(
                  "w-10 h-8",
                  errors.page && "focus-visible:ring-red-500"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(handlePageSubmit)();
                  }
                }}
              />
              <p className="text-zinc-700 text-sm space-x-1">
                <span>/</span>
                <span>{numPages ?? "x"}</span>
              </p>
            </div>

            <Button
              disabled={numPages === undefined || currentPage === numPages}
              onClick={() => {
                setCurrentPage((prev) =>
                  prev + 1 > numPages! ? numPages! : prev + 1
                );
                setValue("page", String(currentPage + 1));
              }}
              variant="ghost"
              aria-label="next page"
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex -ml-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-1.5" aria-label="zoom" variant="ghost">
                  <Search className="h-3 w-3" />
                  {scale * 100}%
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setScale(1)}>
                  100%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setScale(1.5)}>
                  150%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setScale(2)}>
                  200%
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setScale(2.5)}>
                  250%
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setRotation((prev) => {
                return prev < 270 ?  prev + 90 : 0
              })}
              variant="ghost"
              aria-label="rotate 90 degrees"
            >
              <RotateCw className="h-3 w-3" />
            </Button>

            <PdfFullScreen fileUrl={url} />
          </div>
        </div>
        <div className="flex-1 w-full max-h-screen">
          <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
            <div ref={ref}>
              <Document
                loading={
                  <div className="flex justify-center">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onLoadError={() => {
                  toast({
                    title: "Error loading PDF",
                    description: "Please try again later",
                    variant: "destructive",
                  });
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                file={url}
                className="max-h-full"
              >
                {isLoading && renderedScale ? (
                  <Page
                    width={width ? width : 1}
                    pageNumber={currentPage}
                    scale={scale}
                    rotate={rotation}
                    key={"@" + renderedScale}
                  />
                ) : null}

                <Page
                  className={cn(isLoading ? "hidden" : "")}
                  width={width ? width : 1}
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + scale}
                  loading={
                    <div className="flex justify-center">
                      <Loader2 className="my-24 h-6 w-6 animate-spin" />
                    </div>
                  }
                  onRenderSuccess={() => setRenderedScale(scale)}
                />
              </Document>
            </div>
          </SimpleBar>
        </div>
      </div>
      <div className="w-2/5 border-l border-zinc-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Data Enrichment</h2>
            {enrichmentStatus === 'complete' && (
              <Button
                onClick={handleCopyClick}
                variant="ghost"
                size="sm"
                className="text-blue-500 hover:text-blue-600"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy JSON
              </Button>
            )}
          </div>
          {enrichmentStatus === 'loading' && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          {enrichmentStatus === 'complete' && enrichmentData && (
            <div className="max-h-[calc(100vh-12rem)] overflow-auto">
              <SyntaxHighlighter 
                language="json" 
                style={docco}
                customStyle={{
                  backgroundColor: 'transparent',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                }}
              >
                {JSON.stringify(enrichmentData, null, 2)}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
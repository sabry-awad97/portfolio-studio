import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { generateResume } from "@/lib/resume-generator/index";
import { personalInfo, education, projects, skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DownloadResumeButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showIcon?: boolean;
}

export function DownloadResumeButton({
  variant = "default",
  size = "default",
  className,
  showIcon = true,
}: DownloadResumeButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Show loading toast
      const loadingToast = toast.loading("Generating your resume...", {
        description: "Creating a beautiful Word document",
      });

      // Generate the resume
      await generateResume({
        personalInfo,
        education,
        projects,
        skills,
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success state
      setIsSuccess(true);
      toast.success("Resume downloaded successfully!", {
        description: "Check your downloads folder",
        duration: 3000,
      });

      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Failed to generate resume", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={cn(
        "gap-2 transition-all duration-300",
        isSuccess && "bg-green-600 hover:bg-green-700",
        className,
      )}
      aria-label="Download resume as Word document"
    >
      {showIcon && (
        <>
          {isGenerating && (
            <FileText className="h-4 w-4 animate-pulse" aria-hidden="true" />
          )}
          {isSuccess && (
            <CheckCircle2
              className="h-4 w-4 animate-in zoom-in duration-300"
              aria-hidden="true"
            />
          )}
          {!isGenerating && !isSuccess && (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
        </>
      )}
      <span>
        {isGenerating && "Generating..."}
        {isSuccess && "Downloaded!"}
        {!isGenerating && !isSuccess && "Download Resume"}
      </span>
    </Button>
  );
}

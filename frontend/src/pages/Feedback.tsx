import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Footer Component (local to this page)
const Footer = () => {
  return (
    <footer className="bg-[#0a0d12] text-[#6b7686] mt-12 py-6 border-t border-[#1f2530]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
        <p>
          © {new Date().getFullYear()} Smart Stock Predictor. Built with AI &
          Finance.
        </p>
        <div className="flex gap-5 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#c9a227] transition-colors">
            Home
          </Link>
          <Link
            to="/prediction"
            className="hover:text-[#c9a227] transition-colors"
          >
            Prediction
          </Link>
          <Link
            to="/featured"
            className="hover:text-[#c9a227] transition-colors"
          >
            Featured
          </Link>
          <Link to="/news" className="hover:text-[#c9a227] transition-colors">
            News
          </Link>
        </div>
      </div>
    </footer>
  );
};

// Feedback form validation schema
const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  feedback: z
    .string()
    .min(10, "Feedback must be at least 10 characters")
    .max(500, "Feedback must not exceed 500 characters"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const Feedback = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  const onSubmit = async (data: FeedbackForm) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Login first to submit feedback.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback/`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(data)});

      if (!response.ok) throw new Error("Failed to submit feedback");

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
        variant: "default",
      });
      form.reset();
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d12] relative overflow-hidden">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Back button */}
      <div className="absolute top-24 left-6 md:left-12 z-50">
        <Link
          to="/home"
          className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-[#8b93a3] hover:text-[#c9a227] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 md:px-12 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-[#12161f] border border-[#1f2530] rounded-xl p-8 md:p-12 shadow-2xl">
            {/* Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-md bg-[#1a2029] border border-[#232936] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#c9a227]" />
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#e6e9ef] tracking-tight">
                Share your feedback
              </h1>
            </div>

            {/* Feedback form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686]">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="h-11 bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="h-11 bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686]">
                        Feedback
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts, suggestions, or report issues..."
                          {...field}
                          className="min-h-[150px] bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-11 font-mono text-sm font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit feedback"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Feedback;

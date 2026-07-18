import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Message } from "@/components/type/chat";
import { handleChatMessage } from "@/api/chat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const response = await handleChatMessage(input);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-12 z-50">
      {isOpen ? (
        <div className="w-96 h-[600px] rounded-lg flex flex-col overflow-hidden animate-fade-up bg-[#12161f] border border-[#1f2530] shadow-2xl">
          <div className="p-4 border-b border-[#1f2530] flex items-center justify-between bg-[#0d1117]">
            <div className="flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-[#c9a227]" />
              <span className="font-mono font-semibold text-[#e6e9ef] text-base">
                Fin Assistant
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#1a2029] text-[#8b93a3]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0d12]">
            {messages.length === 0 && (
              <p className="font-mono text-xs text-[#6b7686] text-center mt-6">
                Ask about a symbol, a trend, or how the forecast works.
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "bg-[#1a2029] border border-[#232936] ml-auto text-[#e6e9ef]"
                    : "bg-[#12161f] border border-[#1f2530] mr-auto text-[#c3c8d1]",
                )}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#1f2530] bg-[#0d1117]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12]"
              >
                {isLoading ? (
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0d12] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0d12] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a0d12] animate-bounce" />
                  </div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="rounded-full w-14 h-14 animate-fade-up bg-[#12161f] border border-[#1f2530] hover:border-[#c9a227] text-[#c9a227] mx-5 my-5"
              >
                <Brain className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-[#12161f] border border-[#1f2530] text-[#e6e9ef]"
            >
              <p>What can I help you with?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

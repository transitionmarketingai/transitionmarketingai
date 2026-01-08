interface MascotBubbleProps {
  emoji?: string;
  className?: string;
}

export default function MascotBubble({ emoji = '🤖', className }: MascotBubbleProps) {
  return (
    <div className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center ${className}`}>
      <span className="text-2xl">{emoji}</span>
    </div>
  );
}

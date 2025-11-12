import LoadingState from "@/components/LoadingState";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = "Loading…",
  fullScreen = true,
}: LoadingSpinnerProps) {
  return <LoadingState message={message} fullScreen={fullScreen} />;
}

// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-md mb-4">
        <p className="font-medium">{message}</p>
      </div>
    );
  }
  
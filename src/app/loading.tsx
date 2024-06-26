import Loader from "@/components/component/loader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader />
      </div>
    </div>
  );
}

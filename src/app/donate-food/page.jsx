"use client"
import Loader from "@/components/visuals/Loader";
import dynamic from "next/dynamic";

export default function DonateFood() {
  const LoadingComponent = dynamic(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(import("@/components/formComponents/DonateFoodForm"));
        }, 1000); 
      }),
    {
      loading: () => (
        <div>
          <Loader />
        </div>
      ),
      ssr: false,
    }
  );

  return (
    <div>
      <LoadingComponent />
    </div>
  );
}

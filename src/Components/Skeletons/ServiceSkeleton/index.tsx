import Counter from "@/Components/Shared/Counter";
import Skeleton from "@/Components/Shared/Skeleton";
import { TSkeletonProps } from "@/Components/Skeletons/skeleton.types";

const ServiceSkeleton = ({ count }: TSkeletonProps) => {
  return (
    <Counter count={count}>
      <div className="flex flex-col gap-2 mb-5">
        <Skeleton className="h-[15px]" />
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-[10px] w-[60px] mb-3" />
            <Skeleton className="h-[15px] w-[60px]" />
          </div>
          <Skeleton className="h-[20px] w-[20px] rounded-none" />
        </div>
      </div>
    </Counter>
  );
};

export default ServiceSkeleton;

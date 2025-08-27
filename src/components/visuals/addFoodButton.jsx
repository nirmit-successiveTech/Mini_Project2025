import { useRouter } from "next/navigation";


const NeuButton = () => {
    const router = useRouter()
  return (
    <div>
      <button className="px-6 py-2 font-bold bg-purple-700 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      onClick={()=>router.push('/donate-food')}>
        ADD FOOD
      </button>
    </div>
  );
};

export default NeuButton;
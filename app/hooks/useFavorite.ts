import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";



interface IUseFavorite {
  listingId: string;

}

const useFavorite = ({ listingId }: IUseFavorite) => {
  const router = useRouter();



  const hasFavorited = useMemo(() => {
    const list: any[] = [];

    return list.includes(listingId);
  }, [listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  },
    [

      hasFavorited,
      listingId,
      router
    ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;

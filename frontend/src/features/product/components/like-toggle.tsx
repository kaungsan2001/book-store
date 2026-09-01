import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { productLikeToggleFn } from "../api";
import { useState } from "react";
import { queryClient } from "@/api/query";

export function LikeToggleButton({
  productId,
  isLiked,
}: {
  productId: string;
  isLiked: boolean;
}) {
  const [like, setLike] = useState(isLiked);
  const { mutate } = useMutation({
    mutationFn: productLikeToggleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
    onError: () => {
      setLike(isLiked);
    },
    onMutate: () => {
      setLike(!like);
    },
  });
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-destructive"
        onClick={() => mutate(productId)}
      >
        {like ? (
          <Heart className="h-5 w-5" fill="red" color="red" />
        ) : (
          <Heart className="h-5 w-5" color="red" />
        )}
      </Button>
    </>
  );
}

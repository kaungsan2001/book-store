import { useNavigation } from "react-router";
import { useIsFetching } from "@tanstack/react-query";

export function ProgressBar() {
  const navigation = useNavigation();
  const isFetching = useIsFetching() > 0;

  if (isFetching || navigation.state === "loading") {
    return (
      <div className="fixed left-0 top-0 h-0.5 w-full z-50 ">
        <div className="h-full w-2/3 bg-primary animate-progress-bar"></div>
      </div>
    );
  }

  return null;
}

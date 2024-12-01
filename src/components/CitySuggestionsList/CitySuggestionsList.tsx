import { formatFullLocationName } from "@/utils/formatter";
import { CitySuggestionsListProps } from "./CitySuggestionsList.types";
import { Location } from "@/stores/weather-search/types";
import { memo, useCallback } from "react";

const CitySuggestionsList = memo(
  ({
    isLoading = false,
    citySuggestions,
    onSuggestionPress,
  }: CitySuggestionsListProps) => {
    const renderLoadingState = () => {
      return (
        <>
          {[{}, {}, {}, {}, {}].map((item, index) => (
            <li
              key={index}
              className="rounded-xl flex-col content-center h-[50px] truncate py-sm pl-4 pr-sm text-ts-black-main"
            >
              <div className="bg-black/25 rounded-xl h-[20px] w-[75%]"></div>
            </li>
          ))}
        </>
      );
    };

    const renderEmptyState = () => {
      return (
        <div className="h-full w-full">
          <h1>No cities found by input...</h1>
        </div>
      );
    };

    const handleSuggestionPress = useCallback(
      (location: Location) => {
        onSuggestionPress(location);
      },
      [onSuggestionPress]
    );

    const renderItems = () => {
      if (citySuggestions?.length === 0) {
        return renderEmptyState();
      }

      return citySuggestions.map((location, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionPress(location)}
          className="rounded-xl flex-col content-center h-[50px] cursor-pointer truncate py-sm pl-4 pr-sm hover:bg-white/50 active:bg-white/75"
        >
          {formatFullLocationName(
            location.name,
            location.region,
            location.country
          )}
        </li>
      ));
    };

    return (
      <ul className="bg-white/25 absolute z-20 mt-2 flex h-60 w-full flex-col gap-px rounded-xl border border-black outline-0">
        {isLoading ? renderLoadingState() : renderItems()}
      </ul>
    );
  }
);

export default CitySuggestionsList;

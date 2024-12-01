export interface WeatherSearchInputProps {
  isDisabled?: boolean;
  searchText: string;
  placeholder: string;
  onChange: (value: string) => void;
  onFocus?: () => void | undefined;
  onBlur?: () => void | undefined;
  handleSearch?: () => void;
}

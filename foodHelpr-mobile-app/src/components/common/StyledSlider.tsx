import { Slider } from "@miblanchard/react-native-slider";
import { SliderProps } from "@miblanchard/react-native-slider/lib/types";
import { styled } from "nativewind";

function SliderWrapper({ containerStyle, trackStyle, ...props }: SliderProps) {
  return <Slider {...props} trackStyle={trackStyle} />;
}

const StyledSlider = styled(SliderWrapper, {
  props: {
    containerStyle: true,
    trackStyle: true,
  },
});

export default StyledSlider;

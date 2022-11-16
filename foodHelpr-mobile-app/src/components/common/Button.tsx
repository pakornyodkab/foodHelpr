import { Pressable, PressableProps } from "react-native";

function Button(props: PressableProps) {
  return (
    <Pressable
      {...props}
      className={
        props.className +
        " flex justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
      }
    >
      {props.children}
    </Pressable>
  );
}

export default Button;

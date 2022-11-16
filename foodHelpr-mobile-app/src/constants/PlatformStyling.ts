export const PlatformIcon = {
  YouTube: "youtube",
  facebook: "facebook",
};

export const PlatformColor = {
  YouTube: "#FF0000",
  facebook: "#4267B2",
};

export function getPlatformIcon(platform: string) {
  if (platform in PlatformIcon) return PlatformIcon[platform];
  return "";
}

export function getPlatformColorScheme(platform: string) {
  if (platform in PlatformIcon) return PlatformColor[platform];
  return "#FFFFFF";
}

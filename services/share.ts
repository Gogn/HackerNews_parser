import {Linking} from "react-native";

export const onShare = async(url: string) => {
  url ? await Linking.openURL(url) : {}
};

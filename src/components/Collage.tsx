import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { CollageProps } from "../core/types";

export const Collage: React.FC<CollageProps> = React.memo(
  ({
    images,
    matrix,
    width,
    height,
    imageOptions = {},
    seperatorOptions = {},
    style,
    avatar,
    ...props
  }) => {
    let imageIndex = 0;
    let maxColumns = Math.max(...matrix.map((row) => row.length)); // Find max columns in user matrix

    // Ensure first 'maxColumns' images are assigned to separate columns first
    let adjustedMatrix = [...matrix];

    if (images.length <= maxColumns) {
      adjustedMatrix = [new Array(maxColumns).fill(1)]; // Fill one row with images in separate columns
    }

    const { style: sStyle, ...sProps } = seperatorOptions;
    const { style: iStyle, ...iProps } = imageOptions;

    return (
      <View
        style={[{ width, height }, avatar && styles.avatar, style]}
        {...props}
      >
        {adjustedMatrix.map((row, rowIndex) => (
          <View key={rowIndex} style={[styles.row, sStyle]} {...sProps}>
            {row.map((col, colIndex) => {
              if (imageIndex >= images.length) return null; // Stop if no more images

              const source =
                typeof images[imageIndex] === "string"
                  ? { uri: images[imageIndex] }
                  : images[imageIndex];

              imageIndex++;

              return (
                <View key={colIndex} style={[styles.column, { flex: col }]}>
                  <Image
                    source={source as ImageSourcePropType}
                    style={[styles.image, iStyle]}
                    {...iProps}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
  },
  column: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 99999,
  },
});

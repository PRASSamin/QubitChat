/**
 *
 * @param images image count in the array | images array
 * @returns matrix[][]
 */

export const getMatrix = (images: number | string[]): number[][] => {
  let c;
  if (typeof images === "number") {
    c = images;
  } else {
    try {
      c = images.length;
    } catch (error) {
      throw new Error("Invalid images array");
    }
  }

  const columns = Math.ceil(Math.sqrt(c)); // Optimal columns based on sqrt
  const rows = Math.ceil(c / columns); // Calculate rows based on columns

  const matrix: number[][] = [];
  let remainingImages = c;

  for (let i = 0; i < rows; i++) {
    const colsInRow = Math.min(columns, remainingImages);
    matrix.push(new Array(colsInRow).fill(1));
    remainingImages -= colsInRow;
  }

  return matrix;
};

export function cropImageToSquareDataUrl(
  image: HTMLImageElement,
  scale: number,
): string {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";

  const minSide = Math.min(image.naturalWidth, image.naturalHeight);
  const scaledSide = minSide / scale;
  const sourceX = (image.naturalWidth - scaledSide) / 2;
  const sourceY = (image.naturalHeight - scaledSide) / 2;

  context.drawImage(
    image,
    sourceX,
    sourceY,
    scaledSide,
    scaledSide,
    0,
    0,
    size,
    size,
  );

  return canvas.toDataURL("image/jpeg", 0.92);
}

interface OverlayBackdropProps {
  onClick?: () => void;
  zIndex: number;
}

export function OverlayBackdrop({ onClick, zIndex }: OverlayBackdropProps) {
  return (
    <div
      className="fixed inset-0 bg-usns-ink/40 motion-reduce:transition-none"
      style={{ zIndex }}
      aria-hidden="true"
      onClick={onClick}
    />
  );
}

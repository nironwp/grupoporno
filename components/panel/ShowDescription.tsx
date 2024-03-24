export const ShowDescription = ({
  className,
  value,
}: {
  className?: string;
  value: string;
}) => {
  return (
    <div className={className}>
      <div
        className="text-left"
        dangerouslySetInnerHTML={{
          __html: value
            .replaceAll(
              "<h1>",
              "<h1 style='font-size: 32px; font-weight: 700;'>"
            )
            .replaceAll(
              "<h2>",
              "<h2 style='font-size: 24px; font-weight: 700;'>"
            )
            .replaceAll(
              "<h3>",
              "<h3 style='font-size: 18px; font-weight: 700;'>"
            )
            .replaceAll(
              "<ol>",
              "<p style='font-size: 18px; font-weight: 700;'>"
            )
            .replaceAll(
              "<ul>",
              "<p style='font-size: 18px; font-weight: 700;'>"
            ),
        }}
      />
    </div>
  );
};

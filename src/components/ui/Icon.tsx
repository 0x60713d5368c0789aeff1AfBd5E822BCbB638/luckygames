export default function Icon(props: any) {
  const symbolId = `#icon-${props.name}`;
  const color = props.color || "#333";
  return (
    <svg aria-hidden="true" {...props} stroke={color} fill={color}>
      <use xlinkHref={symbolId} fill={color} stroke={color} />
    </svg>
  );
}

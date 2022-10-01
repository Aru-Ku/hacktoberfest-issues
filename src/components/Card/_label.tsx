import type { Label as ILabel } from '../../types';

import { hex as HEX } from 'color-convert';

const CONVERT_HEX_TO_RGB = (hex: string) => HEX.rgb(hex);
const CONVERT_HEX_TO_HSL = (hex: string) => HEX.hsl(hex);

// Referenced from GitHub website CSS
const getParsedColors = (hex: string) => {
  const [R, G, B] = CONVERT_HEX_TO_RGB(hex);
  const [H, S, L] = CONVERT_HEX_TO_RGB(hex);

  const lightness_threshold = 0.6;
  const background_alpha = 0.18;
  const border_alpha = 0.3;
  const perceived_lightness = ((R * 0.2126) + (G * 0.7152) + (B * 0.0722)) / 255;

  const lightness_switch = Math.max(0, /** Min */ Math.min(((perceived_lightness - lightness_threshold) * -1000), 1))
  const lighten_by = ((lightness_threshold - perceived_lightness) * 100) * lightness_switch;

  const textColor = `hsl(${H}, ${S * 0.01}, ${(L + lighten_by) * 0.01})`;
  const backgroundColor = `rgba(${R}, ${G}, ${B}, ${background_alpha})`;
  const borderColor = `hsla(${H}, ${S * 0.01}, ${(L + lighten_by) * 0.01}, ${border_alpha})`

  return {
    textColor, borderColor, backgroundColor
  }
}


export function Labels(props: {
  list: ILabel[] | undefined,
  id?: keyof ILabel,
  count?: number
}) {
  const { list, count = 3, id = "id" } = props;

  if (!list || list?.length <= 0) return (<></>)

  const labels = list.slice(0, count);
  const remainingCount = list.length - labels.length;

  return (
    <div className='flex items-center flex-wrap space-x-2'>
      {labels.map(label => <Label key={label[id]} {...label} />)}
      {remainingCount > 0 && <Label {...{
        color: `+${remainingCount}`,
        id: `+${remainingCount}`,
        name: `+${remainingCount}`,
      }} />}
    </div>
  )
}


export const Label = (props: {
  name: string;
  color: string;
  id: string;
}) => {
  let textColor = 'black';
  let backgroundColor = 'rgb(229 231 235 / var(--tw-bg-opacity))';
  let borderColor = 'rgb(209 213 219 / var(--tw-border-opacity))';

  if (props.color) {
    const colors = getParsedColors(props.color)
    textColor = colors.textColor;
    backgroundColor = colors.backgroundColor;
    borderColor = colors.borderColor;
  }


  return (
    <span
      id={props.id}
      data-color={props.color}
      style={{
        fontSize: 10,
        fontWeight: 500,
        backgroundColor: backgroundColor,
        color: textColor,
        borderColor: borderColor
      }}
      className="leading-none  py-1 px-2 rounded-full border">
      {props.name}
    </span>
  )
}

import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime);

export const TimeStamp = (props: {
  time: string,
  format?: string;
}) => {
  const { time, format = "" } = props;

  return (
    <span className='italic text-gray-600'>
      {dayjs(time).fromNow()}
    </span>
  )
}

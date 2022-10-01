import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime);

export const TimeStamp = (props: {
  time: string,
  format?: string;
}) => {
  const { time, format = "" } = props;

  return (
    <time className='text-gray-600' dateTime={time}>
      {dayjs(time).fromNow()}
    </time>
  )
}

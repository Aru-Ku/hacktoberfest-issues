import { ReactNode } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';

export interface ICardGrid {
  children: ReactNode;
  loadMore: () => void;
  dataLength: number
}

export const CardGrid = (props: ICardGrid) => {
  const { children, loadMore, dataLength = Infinity } = props;

  return (
    <InfiniteScroll loader={<div></div>} hasMore next={loadMore} dataLength={dataLength}>
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4 snap-both snap-proximity">
        {children}
      </div>
    </InfiniteScroll>
  )

}

import { DogrunListItem } from '@/types/Dogrun';
import { Button } from '../ui/button';
import DogrunList from './DogrunList';

type Props = {
  dogruns: DogrunListItem[];
  searchDogrun: () => void;
  searching: boolean;
};

const DogrunSearchList = (props: Props) => {
  const { dogruns, searchDogrun, searching } = props;

  return (
    <div className="w-full flex flex-col bg-slate-50">
      <div className="p-2">
        <Button
          variant="outline"
          size="full"
          onClick={searchDogrun}
          disabled={searching}
        >
          ドッグラン検索
        </Button>
      </div>
      <DogrunList dogruns={dogruns} />
    </div>
  );
};

export default DogrunSearchList;

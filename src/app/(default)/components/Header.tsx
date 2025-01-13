import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DogImage from '@public/dog.jpg';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="px-10 py-3 bg-white border-b border-gray-300 flex justify-between items-center">
      <div className="flex items-center">
        <button className="p-1 bg-inherit flex border-none rounded-full transition-colors duration-500 hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#888888"
              d="M19 12.75H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 0 1.5m0-4.5H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 0 1.5m0 9H5a.75.75 0 0 1 0-1.5h14a.75.75 0 0 1 0 1.5"
            ></path>
          </svg>
        </button>
        <strong className="ml-2">WanRun</strong>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            className="w-10 h-10 rounded-full"
            src={DogImage}
            alt="DogImage"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/">ホーム</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dog">愛犬</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dogrun">ドッグラン</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>ログアウト</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;

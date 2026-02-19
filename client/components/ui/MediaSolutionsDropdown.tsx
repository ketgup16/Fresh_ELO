import { useNavigate } from 'react-router-dom';
import { ChevronDown } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/Button';

export type MediaSolution =
  | 'Sponsored Search'
  | 'Display Advertising'
  | 'Shop Builder'
  | 'Store Ads'
  | 'Unified Reports';

interface MediaSolutionsDropdownProps {
  currentSolution?: MediaSolution;
  onSolutionChange?: (solution: MediaSolution) => void;
}

const solutions: { id: MediaSolution; label: string; route?: string }[] = [
  { id: 'Sponsored Search', label: 'Sponsored Search', route: '/sponsored-search' },
  { id: 'Display Advertising', label: 'Display Advertising', route: '/' },
  { id: 'Shop Builder', label: 'Shop Builder' },
  { id: 'Store Ads', label: 'Store Ads', route: '/store-ads' },
  { id: 'Unified Reports', label: 'Unified Reports' },
];

export function MediaSolutionsDropdown({
  currentSolution = 'Display Advertising',
  onSolutionChange,
}: MediaSolutionsDropdownProps) {
  const navigate = useNavigate();

  const handleSolutionClick = (solution: MediaSolution, route?: string) => {
    if (route) navigate(route);
    onSolutionChange?.(solution);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="small">
          Navigate site
          <ChevronDown style={{ width: 16, height: 16, marginLeft: 4 }} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8}>
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        {solutions.map((s) => (
          <DropdownMenuItem
            key={s.id}
            onSelect={() => handleSolutionClick(s.id, s.route)}
          >
            {s.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Tools</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => navigate('/component-library')}>
          Component Library
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

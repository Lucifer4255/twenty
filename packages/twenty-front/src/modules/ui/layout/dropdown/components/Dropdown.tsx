import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownOnToggleEffect } from '@/ui/layout/dropdown/components/DropdownOnToggleEffect';
import { DropdownComponentInstanceContext } from '@/ui/layout/dropdown/contexts/DropdownComponeInstanceContext';
import { DropdownScope } from '@/ui/layout/dropdown/scopes/DropdownScope';
import { dropdownHotkeyComponentState } from '@/ui/layout/dropdown/states/dropdownHotkeyComponentState';
import { DropdownOffset } from '@/ui/layout/dropdown/types/DropdownOffset';
import { HotkeyScope } from '@/ui/utilities/hotkey/types/HotkeyScope';
import { getScopeIdFromComponentId } from '@/ui/utilities/recoil-scope/utils/getScopeIdFromComponentId';
import styled from '@emotion/styled';
import {
  Placement,
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react';
import { MouseEvent, ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { Keys } from 'react-hotkeys-hook';
import { useRecoilCallback } from 'recoil';
import { isDefined } from 'twenty-shared/utils';
import { useDropdown } from '../hooks/useDropdown';

const StyledDropdownFallbackAnchor = styled.div`
  left: 0;
  position: fixed;
  top: 0;
`;

const StyledClickableComponent = styled.div`
  height: fit-content;
`;

export type DropdownProps = {
  className?: string;
  clickableComponent?: ReactNode;
  dropdownComponents: ReactNode;
  hotkey?: {
    key: Keys;
    scope: string;
  };
  dropdownHotkeyScope: HotkeyScope;
  dropdownId: string;
  dropdownPlacement?: Placement;
  dropdownMenuWidth?: `${string}px` | `${number}%` | 'auto' | number;
  dropdownOffset?: DropdownOffset;
  dropdownStrategy?: 'fixed' | 'absolute';
  onClickOutside?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  avoidPortal?: boolean;
};

export const Dropdown = ({
  className,
  clickableComponent,
  dropdownComponents,
  dropdownMenuWidth,
  hotkey,
  dropdownId,
  dropdownHotkeyScope,
  dropdownPlacement = 'bottom-end',
  dropdownStrategy = 'absolute',
  dropdownOffset,
  onClickOutside,
  onClose,
  onOpen,
  avoidPortal,
}: DropdownProps) => {
  const { isDropdownOpen, toggleDropdown } = useDropdown(dropdownId);

  const isUsingOffset =
    isDefined(dropdownOffset?.x) || isDefined(dropdownOffset?.y);

  const offsetMiddleware = isUsingOffset
    ? [
        offset({
          crossAxis: dropdownOffset?.x ?? 0,
          mainAxis: dropdownOffset?.y ?? 0,
        }),
      ]
    : [];

  const { refs, floatingStyles, placement } = useFloating({
    placement: dropdownPlacement,
    middleware: [
      ...offsetMiddleware,
      flip(),
      size({
        padding: 32,
        apply: () => {
          flushSync(() => {
            // TODO: I think this is not needed anymore let's remove it if not used for a few weeks
            // setDropdownMaxHeight(availableHeight);
          });
        },
        boundary: document.querySelector('#root') ?? undefined,
      }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: dropdownStrategy,
  });

  const handleClickableComponentClick = useRecoilCallback(
    ({ set }) =>
      async (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        // TODO: refactor this when we have finished dropdown refactor with state and V1 + V2
        set(
          dropdownHotkeyComponentState({ scopeId: dropdownId }),
          dropdownHotkeyScope,
        );

        toggleDropdown();
        onClickOutside?.();
      },
    [dropdownId, dropdownHotkeyScope, onClickOutside, toggleDropdown],
  );

  return (
    <DropdownComponentInstanceContext.Provider
      value={{ instanceId: dropdownId }}
    >
      <DropdownScope dropdownScopeId={getScopeIdFromComponentId(dropdownId)}>
        <>
          {isDefined(clickableComponent) ? (
            <StyledClickableComponent
              ref={refs.setReference}
              onClick={handleClickableComponentClick}
              aria-controls={`${dropdownId}-options`}
              aria-expanded={isDropdownOpen}
              aria-haspopup={true}
              role="button"
            >
              {clickableComponent}
            </StyledClickableComponent>
          ) : (
            <StyledDropdownFallbackAnchor ref={refs.setReference} />
          )}
          {isDropdownOpen && (
            <DropdownContent
              className={className}
              floatingStyles={floatingStyles}
              dropdownMenuWidth={dropdownMenuWidth}
              dropdownComponents={dropdownComponents}
              dropdownId={dropdownId}
              dropdownPlacement={placement}
              floatingUiRefs={refs}
              hotkeyScope={dropdownHotkeyScope}
              hotkey={hotkey}
              onClickOutside={onClickOutside}
              onHotkeyTriggered={toggleDropdown}
              avoidPortal={avoidPortal}
            />
          )}
          <DropdownOnToggleEffect
            onDropdownClose={onClose}
            onDropdownOpen={onOpen}
          />
        </>
      </DropdownScope>
    </DropdownComponentInstanceContext.Provider>
  );
};

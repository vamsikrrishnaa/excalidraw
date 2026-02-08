import clsx from "clsx";
import { useState } from "react";

import { actionShortcuts } from "../../actions";
import { useTunnels } from "../../context/tunnels";
import { ExitZenModeButton, UndoRedoActions, ZoomActions } from "../Actions";
import { HelpButton } from "../HelpButton";
import { Section } from "../Section";
import Stack from "../Stack";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { DotsHorizontalIcon } from "../icons";

import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";

const Footer = ({
  appState,
  actionManager,
  showExitZenModeBtn,
  renderWelcomeScreen,
}: {
  appState: UIAppState;
  actionManager: ActionManager;
  showExitZenModeBtn: boolean;
  renderWelcomeScreen: boolean;
}) => {
  const { FooterCenterTunnel, WelcomeScreenHelpHintTunnel } = useTunnels();
  const [isBoardControlsOpen, setIsBoardControlsOpen] = useState(false);

  return (
    <footer
      role="contentinfo"
      className="layer-ui__wrapper__footer App-menu App-menu_bottom"
    >
      <div
        className={clsx("layer-ui__wrapper__footer-left zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-left":
            appState.zenModeEnabled,
        })}
      >
        <Stack.Col gap={2}>
          <Section heading="canvasActions">
            <DropdownMenu open={isBoardControlsOpen} placement="top">
              <DropdownMenu.Trigger
                onToggle={() => setIsBoardControlsOpen((s) => !s)}
                aria-label="Board controls"
                title="Board controls"
              >
                {DotsHorizontalIcon}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                onClickOutside={() => setIsBoardControlsOpen(false)}
                onSelect={() => setIsBoardControlsOpen(false)}
                className="App-toolbar__extra-tools-dropdown"
              >
                <DropdownMenu.ItemCustom
                  onClick={() => setIsBoardControlsOpen(false)}
                >
                  <Stack.Col gap={2}>
                    <ZoomActions
                      renderAction={actionManager.renderAction}
                      zoom={appState.zoom}
                    />

                    {!appState.viewModeEnabled && (
                      <UndoRedoActions
                        renderAction={actionManager.renderAction}
                        className={clsx("zen-mode-transition", {
                          "layer-ui__wrapper__footer-left--transition-bottom":
                            appState.zenModeEnabled,
                        })}
                      />
                    )}
                  </Stack.Col>
                </DropdownMenu.ItemCustom>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Section>
        </Stack.Col>
      </div>
      <FooterCenterTunnel.Out />
      <div
        className={clsx("layer-ui__wrapper__footer-right zen-mode-transition", {
          "transition-right": appState.zenModeEnabled,
        })}
      >
        <div style={{ position: "relative" }}>
          {renderWelcomeScreen && <WelcomeScreenHelpHintTunnel.Out />}
          <HelpButton
            onClick={() => actionManager.executeAction(actionShortcuts)}
          />
        </div>
      </div>
      <ExitZenModeButton
        actionManager={actionManager}
        showExitZenModeBtn={showExitZenModeBtn}
      />
    </footer>
  );
};

export default Footer;
Footer.displayName = "Footer";

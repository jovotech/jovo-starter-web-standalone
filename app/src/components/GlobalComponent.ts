import { ArrayElement, BaseComponent, Component, Global, Intents } from '@jovotech/framework';

const SUPPORTED_THEMES = ['light', 'dark'];

@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    return this.$send({
      message: 'You can say "switch to dark mode" or "light mode."',
      listen: false,
    });
  }

  UNHANDLED() {
    return this.LAUNCH();
  }

  @Intents(['SwitchThemeIntent'])
  switchTheme() {
    const theme = this.$entities.theme?.resolved;
    // if no theme was found or the theme is invalid
    if (!theme || !SUPPORTED_THEMES.includes(theme)) {
      return this.LAUNCH();
    }

    return this.$send({
      message: `Ok, ${theme} mode.`,
      listen: false,
      platforms: {
        web: {
          // custom property for this example
          theme,
        },
      },
    });
  }
}

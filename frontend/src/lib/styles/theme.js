const size = {
  mobile: '770px',
  tabletS: ' 1023px',
  tabletM: ' 1220px',
  laptop: '1460px',
  desktop: '1700px',
};

const theme = {
  mobile: `(max-width: ${size.mobile})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tabletM: `(max-width: ${size.tabletM})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;

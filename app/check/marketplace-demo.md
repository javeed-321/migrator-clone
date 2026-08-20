# Marketplace demo

## Plan availability

<Compatibility title="Bulk export API" subtitle="Export up to 50,000 records per request." plans={{ Free: false, Business: true, Enterprise: true }} />

## Error codes

<AdvancedTable data={[
  { 'code': 'CATEGORY_NOTFOUND', 'status': 'Not Found', 'message': "The category with the slug '{category}' couldn't be found." },
  { 'code': 'CHANGELOG_INVALID', 'status': 'Bad Request', 'message': "We couldn't save this changelog ({error})." }
]} />

## Installing

<SimpleStepper>
  <SimpleStep header="Install the CLI">Run the install command.</SimpleStep>
  <SimpleStep header="Authenticate">Paste your API key when prompted.</SimpleStep>
</SimpleStepper>

<Terminal>{`
  $ npm install -g doc-ai-cli
  added 1 package in 2s
  $ doc-ai login
  Logged in as accounts@documentation.ai
`}</Terminal>

## The maths

<Latex>{`
  Throughput is $\\frac{r_{max}}{1 + e^{-k(t - t_0)}}$ requests per second.
`}</Latex>

## Reference

<Spoiler>The default rate limit is 60 requests per minute.</Spoiler>

<KeyPress keyCombo="Ctrl+Alt+d">Debug mode exposes the raw request payload.</KeyPress>

<ToggleList>
  <ToggleListItem title="Connection issues">Check your firewall allows outbound 443.</ToggleListItem>
  <ToggleListItem title="Auth failures">Verify the key has not expired.</ToggleListItem>
</ToggleList>

## Status and downloads

<StatusPage title="Service status" url="https://status.documentation.ai" />

<DownloadOASButton url="https://demo.readme.io/openapi/openapi.json" />

<GitHubBadge owner="readmeio" repo="marketplace" workflow="ci.yml" />

<Banner isInline={true} message="Scheduled maintenance on Sunday 02:00 UTC." color="#118cfd" textColor="#ffffff" />

## Gallery

<SnapSlider>
  ![Dashboard](https://files.readme.io/dashboard.png)

  ![Analytics](https://files.readme.io/analytics.png)
</SnapSlider>

<Windows header="README.TXT">
  This frame is decoration. The **text** inside is still markdown.
</Windows>

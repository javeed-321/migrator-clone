# Rate limiting

Plans start at $5 and scale to $50 per month.

<Latex>{`
  Sustained throughput follows $\\frac{r_{max}}{1 + e^{-k(t - t_0)}}$ requests per second,
  where $r_{max}$ is the ceiling and $t_0$ the midpoint.
`}</Latex>

The total budget over a window is:

<Latex>{`
  $$\\int_{0}^{T} r(t)\\,dt = \\frac{r_{max}}{k}\\ln\\left(1 + e^{k(T - t_0)}\\right)$$
`}</Latex>

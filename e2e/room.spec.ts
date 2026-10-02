import { expect, test } from '@playwright/test';

test('keyboard selection, interrupted selections, descriptions and reset', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('canvas')).toBeVisible();
  const sofa = page.getByRole('button', {
    name: 'The slow-down sofa',
    exact: true,
  });
  await sofa.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'The slow-down sofa' }),
  ).toBeVisible();
  await expect(page.locator('.detail-panel')).toBeFocused();
  await page.getByRole('button', { name: 'Room to grow', exact: true }).click();
  await page
    .getByRole('button', { name: 'The Sunday soundtrack', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'The Sunday soundtrack' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.detail-panel')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'The Sunday soundtrack', exact: true }),
  ).toBeFocused();
  await sofa.click();
  await page.getByRole('button', { name: 'Back to the room' }).click();
  await expect(page.locator('.detail-panel')).toHaveCount(0);
  await sofa.click();
  await page.getByRole('button', { name: 'Return to full room view' }).click();
  await expect(sofa).toHaveAttribute('aria-pressed', 'false');
  expect(errors).toEqual([]);
});
test('reduced motion, pause, guide, and responsive layout', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.getByText('Reduced motion', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Pause ambient animations' }),
  ).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Pause ambient animations' }).click();
  await expect(page.getByText('A still moment')).toBeVisible();
  await page.getByRole('button', { name: 'Resume ambient animations' }).click();
  await page.getByRole('button', { name: 'A little guide' }).click();
  await expect(
    page.getByRole('complementary', { name: 'Room guide' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('complementary', { name: 'Room guide' }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole('button', { name: 'A moment for yourself', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'A moment for yourself' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test('WebGL failure keeps every story available', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function (
        this: HTMLCanvasElement,
        ...args: Parameters<typeof original>
      ): ReturnType<typeof original> {
        if (String(args[0]).includes('webgl')) return null;
        return original.apply(this, args);
      },
    });
  });
  await page.goto('./');
  await expect(
    page.getByRole('heading', { name: 'A little room, in words.' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'A different perspective', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'A different perspective' }),
  ).toBeVisible();
});
test('context loss provides a recovery path', async ({ page }) => {
  await page.goto('./');
  await expect(
    page.getByRole('button', { name: 'Explore The slow-down sofa' }),
  ).toBeVisible();
  await page
    .locator('canvas')
    .evaluate((canvas) =>
      canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })),
    );
  await expect(
    page.getByRole('button', { name: 'Try loading again' }),
  ).toBeVisible();
});

test('scene markers and narrow layouts remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page
    .getByRole('button', { name: 'Explore The slow-down sofa' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'The slow-down sofa' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close description' }).click();
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

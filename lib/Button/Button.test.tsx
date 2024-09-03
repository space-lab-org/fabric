import { test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './index'


describe(`Component: ${Button.name}`, () => {
  test('Render button', () => {
    render(<Button>This is the button</Button>);
    expect(screen.getByText("This is the button")).toBeDefined();
  })
})
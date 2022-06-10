import { render, act, fireEvent, cleanup, screen } from "@testing-library/react";
// import axios from 'axios'
import { BrowserRouter} from 'react-router-dom'
import Random from '../Random'

beforeEach( () => {
    document.body.innerHTML = ""
  })
  
afterEach( () => {
    cleanup()
})



const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {

    return {

        ...(jest.requireActual('react-router-dom') as any),

        useNavigate: () => mockNavigate,

    }

})


describe('Back button test', () => {
    it('back button function',  async() => {
        render(
        <BrowserRouter>
        <Random />
        </BrowserRouter>)

        const backButton = screen.getByRole('button', {name: 'Back'})

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await fireEvent.click(backButton)
        })

        expect(backButton).toBeInTheDocument()
    })
})
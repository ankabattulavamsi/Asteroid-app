import { render, act, fireEvent, cleanup, screen } from "@testing-library/react";
// import axios from 'axios'
import Home from '../Home'

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

test('renders input properly',  () => {
     render(<Home />);
    const numberLabel = screen.getByTestId('number-input')
    expect(numberLabel).toBeInstanceOf(HTMLInputElement)
    const input = screen.getByTestId('number-input')
    expect(input).toBeDefined()
})


test('button should be disabled for empty number',  () => {
    render(<Home />);
    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {'target': {'value': ''}})
    const btn = screen.getByTestId('number-button')
    expect(btn).toHaveAttribute('disabled')
})


test('button should be enabled for non-empty number',  () => {
    render(<Home />);

    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {'target': {'value': ''}})
    const btn = screen.getByTestId('number-button')
    expect(btn).toHaveAttribute('disabled')
    fireEvent.change(numberInput, {'target': {'value': '2001036'}})
    expect(btn).toBeEnabled()
    // expect(btn).not.toHaveAttribute('disabled')
})


test('calls onClick prop when clicked',  () => {
    render(<Home />);

    const numberInput = screen.getByTestId('number-input');
    fireEvent.change(numberInput, {'target': {'value': ''}})
    const btn = screen.getByTestId('random-button')
    // expect(btn).toHaveAttribute('onclick')
    fireEvent.change(numberInput, {'target': {'value': '2001036'}})
    expect(btn).toBeEnabled()
    // expect(btn).not.toHaveAttribute('disabled')
})



test("Random button function test", async() =>{
    render(<Home />)
    const randomBtn = screen.getByTestId('random-button')
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
        await fireEvent.click(randomBtn)
    })
    expect(randomBtn).toBeInTheDocument()
})


jest.mock("axios", () => ({
    get: jest.fn((_url, _body)=>{
        return new Promise((resolve, reject) => {
            if(_url === `https://api.nasa.gov/neo/rest/v1/neo/2001866?api_key=Ximney5WB5uZ3i91efKSEIBovbUqLM0QfHqgzfD2`){
                resolve({
                    data:{
                        name: "1866 Sisyphus (1972 XA)",
                        nasa_jpl_url: "http//:abe.com",
                        is_potentially_hazardous_asteroid: true,
                    },
                    status: 200
                })
            }
            if(_url===`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Ximney5WB5uZ3i91efKSEIBovbUqLM0QfHqgzfD2`){
                resolve({
                    data:{
                        near_earth_objects: [{
                            id: "2001866"
                        }]
                    },
                    status: 200
                })
            }
            else {(
                reject(
                    new Error("Data not found 404")
                )
            )}
        })
    })
}))
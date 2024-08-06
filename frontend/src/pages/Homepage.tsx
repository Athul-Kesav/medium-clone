import Blogthumbs from "../components/Blogthumbs"

const Homepage = () => {
  return (
    <div className="px-32">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Blogthumbs title="Figma is not forever" desc="And inVision is now gone" authName="Michal Malewicz" stats={{ memberOnly: true, claps: 2500, resp: 51, date: new Date("2024-01-07") }} />
        </div>
      </div>
    </div>
  )
}

export default Homepage
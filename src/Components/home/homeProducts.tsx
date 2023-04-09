import React from 'react'

function HomeProducts({category, clickHandler}: any) {
  return (
    <div>
                  <div className="flex justify-between items-center">
              <h1
              className="md:text-[1.2rem] text-sm text-center"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: "#000",
                  margin: "1rem 2rem",
                  padding: "0 2rem",
                  backgroundImage: "url(/assets/bckgrd.png)",
                  backgroundRepeat: "no-repeat",
                }}>
                {category}
              </h1>

              <h1
                onClick={clickHandler}
                className="md:text-[1.2rem] text-sm text-center cursor-pointer"
                style={{
                  fontWeight: 700,
                  color: "#000",
                  margin: "0rem 2rem",
                  padding: "0 2rem",
                  backgroundImage: "url(/assets/bckgrd.png)",
                  backgroundRepeat: "no-repeat",
                }}>
                SEE MORE
              </h1>
            </div>
    </div>
  )
}

export default HomeProducts

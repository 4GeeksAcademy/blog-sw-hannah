import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Collapse } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const images = {
  people: [
    "https://preview.redd.it/the-last-jedi-did-not-ruin-luke-skywalker-v0-g0pbhtswacle1.jpeg?width=640&crop=smart&auto=webp&s=bc59bc9e05f25da8c610554cd4f54018faae24c3",
    "https://static.wikia.nocookie.net/starwars/images/a/a2/C-3PO-TROSTGG.png/revision/latest/scale-to-width-down/1200?cb=20230706042830",
    "https://i.pinimg.com/474x/93/0f/70/930f70a5d2dcae3cab95ae6c2731dfd3.jpg",
    "https://i.pinimg.com/736x/51/e3/7c/51e37c2b688170cdc07888eba287bfd1.jpg",
    "https://www.ecured.cu/images/f/f3/Leia.jpg",
    "https://static.wikia.nocookie.net/starwars/images/8/81/Owen-OP.jpg/revision/latest?cb=20070626181249",
    "https://pm1.aminoapps.com/6168/ff4e27ef435e7191ca5429126c31754115a93776_00.jpg",
  ],
  vehicles: [
    "https://static.wikia.nocookie.net/starwars/images/3/3d/MCQ-sandcrawler.png/revision/latest/scale-to-width-down/1685?cb=20130308043153",
    "https://static.wikia.nocookie.net/starwars/images/7/7b/MarkIIMediumBlaster-SWL36.jpg/revision/latest?cb=20220102162324",
    "https://static.wikia.nocookie.net/swse/images/2/22/T-16_Skyhopper.jpg/revision/latest/scale-to-width-down/251?cb=20220406211641",
    "https://as2.ftcdn.net/jpg/05/17/80/49/1000_F_517804998_qeL4sIEnwefbf1xHUqmSc6jrJUzbGVlY.jpg",
    "https://static.wikia.nocookie.net/esstarwars/images/c/c5/T-47_airspeeder.jpg/revision/latest?cb=20240207232613",
    "https://static.wikia.nocookie.net/esstarwars/images/1/16/AT-AT_2_Fathead.png/revision/latest?cb=20171220212436",
    "https://static.wikia.nocookie.net/esstarwars/images/1/17/TIE_Bomber_BF2.png/revision/latest?cb=20171101030957",
  ],
  planets: [
    "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357",
    "https://static.wikia.nocookie.net/esstarwars/images/4/4a/Alderaan.jpg/revision/latest/thumbnail/width/360/height/360?cb=20100723184830",
    "https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729",
    "https://static.wikia.nocookie.net/esstarwars/images/1/1d/Hoth_SWCT.png/revision/latest?cb=20170802030704",
    "https://static.wikia.nocookie.net/esstarwars/images/5/58/Dagobah_FDNP.png/revision/latest?cb=20170622141310",
    "https://static.wikia.nocookie.net/esstarwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170527220537",
    "https://static.wikia.nocookie.net/esstarwars/images/e/e5/Endor-SWCT.png/revision/latest?cb=20170629180854",
  ],
};

const Home = () => {
  const { addFavorite, favorites } = useOutletContext();

  const [data, setData] = useState({ people: [], vehicles: [], planets: [] });
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleRes, vehiclesRes, planetsRes] = await Promise.all([
          fetch("https://www.swapi.tech/api/people?page=1&limit=7"),
          fetch("https://www.swapi.tech/api/vehicles?page=1&limit=7"),
          fetch("https://www.swapi.tech/api/planets?page=1&limit=7"),
        ]);

        const peopleData = await peopleRes.json();
        const vehiclesData = await vehiclesRes.json();
        const planetsData = await planetsRes.json();

        setData({
          people: peopleData.results,
          vehicles: vehiclesData.results,
          planets: planetsData.results,
        });
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setData({ people: [], vehicles: [], planets: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDetails = async (uid, type) => {
    if (details[uid]) return;
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const info = await res.json();
      setDetails((prev) => ({ ...prev, [uid]: info.result.properties }));
    } catch (error) {
      console.error("Error cargando detalles:", error);
    }
  };
  
  const renderDetailsParagraph = (detailObj, type) => {
    if (!detailObj) return <p>Cargando detalles...</p>;

    let description = "";

    if (type === "people") {
      description = `${detailObj.name} es un personaje de género ${detailObj.gender || "desconocido"}, con una altura de ${detailObj.height || "N/A"} cm y un peso de ${detailObj.mass || "N/A"} kg. Tiene el cabello de color ${detailObj.hair_color || "N/A"}, la piel de tono ${detailObj.skin_color || "N/A"} y los ojos ${detailObj.eye_color || "N/A"}. Nació en el año ${detailObj.birth_year || "desconocido"}.`;
    }

    if (type === "vehicles") {
      description = `El vehículo ${detailObj.name} pertenece a la clase ${detailObj.vehicle_class || "N/A"} y fue fabricado por ${detailObj.manufacturer || "N/A"}. Su modelo es ${detailObj.model || "N/A"}, tiene capacidad para ${detailObj.crew || "N/A"} tripulantes y ${detailObj.passengers || "N/A"} pasajeros. Su longitud es de ${detailObj.length || "N/A"} metros y cuesta ${detailObj.cost_in_credits || "N/A"} créditos.`;
    }

    if (type === "planets") {
      description = `${detailObj.name} es un planeta con clima ${detailObj.climate || "N/A"} y un terreno principalmente de tipo ${detailObj.terrain || "N/A"}. Tiene una población estimada de ${detailObj.population || "desconocida"}, con un diámetro de ${detailObj.diameter || "N/A"} km y gravedad de ${detailObj.gravity || "N/A"}. Su día dura ${detailObj.rotation_period || "N/A"} horas y su año orbital es de ${detailObj.orbital_period || "N/A"} días.`;
    }

    return <p style={{ margin: "0", whiteSpace: "pre-line" }}>{description}</p>;
  };

  if (loading) return <p className="text-center mt-5">Cargando...</p>;

  const renderCards = (items, type) => (
    <Row className="mb-4">
      {items.map((item, i) => (
        <Col key={i} md={4} className="mb-3">
          <Card>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "100%",
                overflow: "hidden",
              }}
            >
              <Card.Img
                src={images[type][i] || "https://via.placeholder.com/300"}
                alt={item.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => {
                  setOpenCard(openCard === item.uid ? null : item.uid);
                  fetchDetails(item.uid, type);
                }}
              >
                Ver detalles
              </Button>
              <Button
                variant="warning"
                onClick={() =>
                  addFavorite({ name: item.name, uid: item.uid, type })
                }
              >
                ⭐ Favorito
              </Button>
              <Collapse in={openCard === item.uid}>
                <div
                  className="mt-3"
                  style={{ fontSize: "0.9rem", lineHeight: "1.4em" }}
                >
                  {renderDetailsParagraph(details[item.uid], type)}
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className="mt-5">
      <h2 className="mb-3">Personajes</h2>
      {renderCards(data.people, "people")}

      <h2 className="mb-3">Vehículos</h2>
      {renderCards(data.vehicles, "vehicles")}

      <h2 className="mb-3">Planetas</h2>
      {renderCards(data.planets, "planets")}
    </Container>
  );
};

export default Home;

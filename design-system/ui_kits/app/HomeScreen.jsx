// Home: the household carousel on top, then what's coming up and a log of what's happened.
function HomeScreen({ go, home = homeDefaults, openFlow = () => {} }) {
  const [homeId, setHomeId] = React.useState(households[0].id);
  // The body follows the home selected in the header; the catch-up slide shows everyone.
  const h = households.find((x) => x.id === homeId);
  const members = h ? h.members : households.flatMap((x) => x.members);
  const scope = h ? h.label : "Everyone";
  return (
    <>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <HomeHeader state={home} go={go} openFlow={openFlow} onActive={setHomeId} />
        <div style={{ padding: "var(--space-5) var(--space-5) var(--space-8)" }}>
          <ComingUp members={members} scope={scope} state={home} go={go} openFlow={openFlow} />
          <Updates key={homeId} members={members} scope={scope} state={home} go={go} />
        </div>
      </div>
    </>
  );
}

Object.assign(window, { HomeScreen });

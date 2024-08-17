import Accordion from "../material/Accordion";
import Avatar from "../material/Avatar";
import Backdrop from "../material/Backdrop";
import Badge from "../material/Badge";
import BottomNavigation, {
  BottomNavigationElement,
} from "../material/BottomNavigation";
import Button from "../material/Button";
import ButtonGroup from "../material/ButtonGroup";
import CheckBox from "../material/CheckBox";
import Chip from "../material/Chip";
import Dialog from "../material/Dialog";
import Drawer from "../material/Drawer";
import FloatingActionButton from "../material/FloatingActionButton";
import Form from "../material/Form";
import IconButton from "../material/IconButton";
import ListItems, { ListItemElement } from "../material/ListItems";
import Menu, { MenuElement } from "../material/Menu";
import Pagination from "../material/Pagination";
import Paper from "../material/Paper";
import Progress from "../material/Progress";
import Radio from "../material/Radio";
import Rating from "../material/Rating";
import Select from "../material/Select";
import Separator from "../material/Separator";
import Skeleton from "../material/Skeleton";
import Slider from "../material/Slider";
import Snackbar from "../material/Snackbar";
import SpeedDial, { SpeedDialElement } from "../material/SpeedDial";
import Switch from "../material/Switch";
import TextField from "../material/TextField";
import ToggleButton from "../material/ToggleButton";
import ToolTip from "../material/ToolTip";
import Typography from "../material/Typography";

import { useContext } from "react";
import { MuiStyleContext } from "./index";
import { renderToString } from "react-dom/server";

function BuildElement() {
  return (
    <>
      <Accordion summary="a">allo</Accordion>
      <Avatar />
      <Backdrop />
      <Badge>
        <div />
      </Badge>
      <BottomNavigation>
        <BottomNavigationElement />
      </BottomNavigation>
      <Button />
      <ButtonGroup>
        <Button />
      </ButtonGroup>
      <CheckBox />
      <Chip label="a" />
      <Dialog content={{ text: "a" }} />
      <Drawer open={false}>
        <ListItems>
          <ListItemElement />
        </ListItems>
      </Drawer>
      <FloatingActionButton>a</FloatingActionButton>
      <Form>
        <input />
      </Form>
      <IconButton>
        <div />
      </IconButton>
      <Menu>
        <MenuElement key={0}>a</MenuElement>
      </Menu>
      <Pagination count={1} selected={1} onSelect={() => {}} />
      <Paper />
      <Progress />
      <Radio />
      <Rating />
      <Separator />
      <Skeleton />
      <Slider min={0} max={1} step={1} />
      <Snackbar position="bottom-left">A</Snackbar>
      <SpeedDial>
        <SpeedDialElement>
          <div />
        </SpeedDialElement>
      </SpeedDial>
      <Switch />
      <TextField />
      <ToggleButton>a</ToggleButton>
      <ToolTip title="a">
        <div />
      </ToolTip>
      <Typography>a</Typography>
      <Select name="a">
        <option value={1}>a</option>
      </Select>
    </>
  );
}

let content: Record<string, string> = {};

function Builder() {
  const styleContext = useContext(MuiStyleContext);
  content = styleContext.content;

  return <></>;
}

async function DoBuild() {
  renderToString(<BuildElement />);
  renderToString(<Builder />);

  await WriteToDisk();
}

function formatContent() {
  return Object.assign(
    {},
    ...Object.keys(content)
      .filter((key) => content[key].length > 1)
      .map((key) => {
        return {
          [key]: content[key],
        };
      })
  ) as Record<string, string>;
}

async function WriteToDisk() {
  const currentPath = import.meta.dirname;
  const content = formatContent();
  await Bun.write(currentPath + "/style.json", JSON.stringify(content));
  await Bun.write(
    currentPath + "/style.css",
    Object.values(content).join("\n")
  );
}

if (import.meta.main) {
  await DoBuild();
}

export default DoBuild;

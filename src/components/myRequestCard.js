import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MyRequestCard({ request }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        m: 2,
        borderRadius: 4,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={request.name}
        subheader={request.date.toString()}
      />

      <CardContent>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={4} component="th" scope="row">
                <ListItem disablePadding>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={request.targetDate} />
                </ListItem>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <ListItem disablePadding>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={request.itemName} />
                </ListItem>
              </TableCell>
              <TableCell component="th" scope="row">
                <ListItem disablePadding>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Quantity: " + request.quantity} />
                </ListItem>
              </TableCell>
              <TableCell component="th" scope="row">
                <ListItem disablePadding>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={request.type} />
                </ListItem>
              </TableCell>

              <TableCell component="th" scope="row">
                <ListItem disablePadding>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary={request.traMod} />
                </ListItem>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, p: 2 }}>
          Details
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={request.emailId} />
                  </ListItem>
                </TableCell>

                <TableCell component="th" scope="row">
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={request.mobile} />
                  </ListItem>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={2} component="th" scope="row">
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        request.address1 +
                        ", " +
                        request.address2 +
                        ", " +
                        request.city +
                        ". " +
                        request.pinCode
                      }
                    />
                  </ListItem>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={2} component="th" scope="row">
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary={request.details} />
                  </ListItem>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table aria-label="simple table">
            <TableBody>
              {request.status == "Requested" && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      sx={{ m: 1, background: "#1a237e", borderRadius: 4 }}
                    >
                      <Typography variant="h6" component="div">
                        Requested
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
              {request.status != "Requested" && (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      sx={{ m: 1, background: "#1a237e", borderRadius: 4 }}
                    >
                      <Typography variant="h6" component="div">
                        {request.status}
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Collapse>
    </Card>
  );
}
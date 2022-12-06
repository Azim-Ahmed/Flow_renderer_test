import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  // MiniMap,
  updateEdge,
  MarkerType,
} from "react-flow-renderer";
import TextField from "@mui/material/TextField";
import { Layout, Sidebar } from "../components";
import "../assets/Css/updatenode.css";
import "../index.css";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CustomEdge from "../components/FlowComponents/CustomEdge";
import ConnectionLine from "../components/FlowComponents/CustomEdge/ConnectionLine";
import NodeA from "../components/FlowComponents/Nodes/NodeA";
import NodeB from "../components/FlowComponents/Nodes/NodeB";
import NodeC from "../components/FlowComponents/Nodes/NodeC";
import { edgeArrowId } from "../helpers";
import { flowInitial } from "../assets/FlowData/Data";
import Text from "../components/FlowComponents/Nodes/Text";
import ChromeExample from '../components/FlowComponents/Nodes/Browser';
const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const flowImageDownloadRef = useRef();
  const nodeTypes = useMemo(
    () => ({
      nodeA: NodeA,
      nodeB: NodeB,
      nodeC: NodeC,
      nodeD: Text,
      nodeE: ChromeExample,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );
  const getNodes = flowInitial.filter(
    (item) =>
      item.type === "nodeA" || item.type === "nodeB" || item.type === "nodeC"
  );
  const getEdges = flowInitial.filter((item) => item.type === "custom");
  console.log({ getNodes, flowInitial });
  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(getEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [nodeBg, setNodeBg] = useState("");
  // const [group, setGroup] = useState("");

  const [sizeX, setSizeX] = useState(0);
  const [sizeY, setSizeY] = useState(0);
  const [type, setType] = useState();
  // const [parent, setParent] = useState();
  const [id, setID] = useState();
  const [jsonInput, setJsonInput] = useState("");

  const convert = useCallback(
    (event) => {
      const jsonNode = JSON.parse(jsonInput);
      const filteredEdges = jsonNode.filter((item) => item.type === "edge");
      const filteredNodes = jsonNode.filter((item) => item.type !== "edge");
      console.log({ filteredEdges, filteredNodes });
      setNodes((nds) => nds.concat(filteredNodes));
      setEdges((nds) => nds.concat(filteredEdges));
    },
    [jsonInput, setNodes, setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const source = params?.source;
      const target = params.target;
      // const newNodeBLineEdge = source.split("_").includes("nodeB");
      // if (!params?.source || !params?.target || newNodeBLineEdge) {
      //   return;
      // }
      const newEdgeId = edgeArrowId(source, target);
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: newEdgeId,
            type: "custom",
            animated: false,
            data: {
              text: "connection line text",
            },
            style: {
              strokeWidth: 2,
              stroke: "#FF0072",
            },

            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#FF0072",
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.selected === true) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
          node.style = { ...node.style, backgroundColor: nodeBg };
          console.log("size: " + sizeX);

          node.style.width = parseInt(sizeX);
          node.style.height = parseInt(sizeY);
        }

        return node;
      })
    );
  }, [nodeName, nodeBg, sizeX, sizeY, setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/reactflow/label");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      let newNode;
      if (type === "nodeA") {
        newNode = {
          id: `flow_azim_${type}_renderer_${uuidv4()}`,
          type,
          position,
          data: { label: `${label}` },
          style: {
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }

      if (type === "nodeB") {
        newNode = {
          id: `flow_azim_${type}_renderer_${uuidv4()}`,
          type,
          position,
          data: { label: `${label}` },
          style: {
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
      if (type === "nodeC") {
        newNode = {
          id: `flow_azim_${type}_renderer_${uuidv4()}`,
          type,
          position,
          data: { label: `${label}` },
          style: {
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
      if (type === "nodeD") {
        newNode = {
          id: `flow_azim_${type}_renderer_${uuidv4()}`,
          type,
          position,
          data: { label: `${label}` },
          style: {
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
      if (type === "nodeE") {
        newNode = {
          id: `flow_azim_${type}_renderer_${uuidv4()}`,
          type,
          position,
          data: { label: `${label}` },
          style: {
            borderRadius: 6,
            borderColor: "#1111",
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );
  const onNodeClick = (event, node) => {
    setOpenEditor(true);
    event.preventDefault();
    setNodeName(node.data.label);
    setID(node.id);
  };

  const onPaneClick = (event) => setOpenEditor(false);
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  const graphStyles = {
    width: "100%",
    minHeight: `calc(100vh - 100px)`,
    Background: "white",
  };
  return (
    <Layout
      jsonInput={jsonInput}
      setJsonInput={setJsonInput}
      convert={convert}
      flowImageDownloadRef={flowImageDownloadRef}
      downloadJSON={[...edges, ...nodes]}
    >
      <div className="bg-indigo-100 py-2">
        <div className>
          <Grid container>
            <Grid item xs={2} md={2}>
              <Sidebar />
            </Grid>
            <Grid ref={flowImageDownloadRef} item xs={10} md={10}>
              <div
                className=" bg-indigo-100 rounded-md my-1 mx-2 border-2 border-indigo-400"
                ref={reactFlowWrapper}
              >
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onEdgeUpdate={onEdgeUpdate}
                  connectionLineComponent={ConnectionLine}
                  connectionLineType="smoothstep"
                  onNodeDragStart={(event, node) => {
                    event.preventDefault();
                    setNodeBg(node.style.backgroundColor);
                    setNodeName(node.data.label);
                    setSizeX(node.style.width);
                    setSizeY(node.style.height);
                    setType(node.type);
                    setID(node.id);
                  }}
                  onPaneClick={onPaneClick}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  onNodeClick={onNodeClick}
                  style={graphStyles}
                >
                  {/* <MiniMap /> */}
                  {openEditor && (
                    <div className="updatenode__controls ">
                      <div className="grid grid-cols-1 divide-y divide-black">
                        <div>
                          <TextField
                            value={nodeName}
                            label={`Label:`}
                            onChange={(evt) => setNodeName(evt.target.value)}
                            id="outlined-basic"
                            variant="outlined"
                            color="secondary"
                          />
                          <div>
                            <div className="py-1">Info:</div>
                            <div
                              style={{
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                width: "180px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Type: {type}
                            </div>
                            <div
                              style={{
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                width: "180px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              ID: {id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Controls />
                  <Background gap={8} color="black" />
                </ReactFlow>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default FlowCanvas;

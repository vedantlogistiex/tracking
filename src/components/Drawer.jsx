import { Drawer, FormControlLabel, Switch, TextField, IconButton } from "@mui/material";

function CustomDrawer({ open, setOpen, colors = {}, setColors, layout = {}, setLayout }) {
  if (!colors || !layout) return null; // Prevent errors if undefined

  const handleColorChange = (type) => (e) => {
    setColors({ ...colors, [type]: e.target.value });
  };

  const toggleLayout = (section) => () => {
    setLayout({ ...layout, [section]: !layout[section] });
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="p-6 w-80 space-y-6">
        <h2 className="text-2xl font-bold">Customize Layout</h2>

        <div>
          <h3 className="text-lg font-semibold mb-4">Colors</h3>
          <div className="space-y-4">
            <TextField
              label="Primary Color"
              type="color"
              fullWidth
              value={colors.primary}
              onChange={handleColorChange("primary")}
            />
            <TextField
              label="Secondary Color"
              type="color"
              fullWidth
              value={colors.secondary}
              onChange={handleColorChange("secondary")}
            />
            <TextField
              label="tertiary Color"
              type="color"
              fullWidth
              value={colors.tertiary}
              onChange={handleColorChange("tertiary")}
            />
            <TextField
              label="Paper Color"
              type="color"
              fullWidth
              value={colors.paper}
              onChange={handleColorChange("paper")}
            />
            <TextField
              label="Text Color"
              type="color"
              fullWidth
              value={colors.textPrimary}
              onChange={handleColorChange("textPrimary")}
            />
            <TextField
              label="Secondary Text Color"
              type="color"
              fullWidth
              value={colors.textSecondary}
              onChange={handleColorChange("textSecondary")}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Layout Options</h3>
          <div className="space-y-2">
            <FormControlLabel
              control={<Switch checked={layout.horizontal} onChange={toggleLayout("horizontal")} />}
              label="Horizontal"
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default CustomDrawer;

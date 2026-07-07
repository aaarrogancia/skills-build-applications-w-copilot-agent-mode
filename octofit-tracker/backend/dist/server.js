"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_js_1 = require("./models.js");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
const createRouter = (resourceName, Model) => {
    const router = express_1.default.Router();
    router.get('/', async (_req, res) => {
        const items = await Model.find({});
        res.json(items);
    });
    router.post('/', async (req, res) => {
        const item = new Model(req.body);
        await item.save();
        res.status(201).json(item);
    });
    router.get('/:id', async (req, res) => {
        const item = await Model.findById(req.params.id);
        if (!item) {
            res.status(404).json({ error: `${resourceName} not found` });
            return;
        }
        res.json(item);
    });
    router.put('/:id', async (req, res) => {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            res.status(404).json({ error: `${resourceName} not found` });
            return;
        }
        res.json(item);
    });
    router.delete('/:id', async (req, res) => {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ error: `${resourceName} not found` });
            return;
        }
        res.json({ deleted: true, id: req.params.id });
    });
    return router;
};
app.use('/api/users', createRouter('user', models_js_1.User));
app.use('/api/teams', createRouter('team', models_js_1.Team));
app.use('/api/activities', createRouter('activity', models_js_1.Activity));
app.use('/api/leaderboard', createRouter('leaderboard entry', models_js_1.LeaderboardEntry));
app.use('/api/workouts', createRouter('workout', models_js_1.Workout));
const startServer = async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});

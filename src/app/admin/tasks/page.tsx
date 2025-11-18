'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Brain,
  Loader2,
  LayoutGrid,
  Table as TableIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/tracking';

interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  status: string;
  assignedTo: string;
  relatedEntity: string;
  dueDate: string;
  createdAt: string;
  aiSummary: string;
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.set('type', typeFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const response = await fetch(`/api/tasks/list?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setTasks(data.data.tasks || []);
      } else {
        toast.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [typeFilter, statusFilter]);

  // Handle update task
  const handleUpdateTask = async (taskId: string, field: 'status' | 'assignedTo' | 'priority', value: string) => {
    try {
      const updateData: any = { taskId };
      updateData[field] = value;

      const response = await fetch('/api/tasks/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Task updated');
        fetchTasks();
        if (selectedTask?.id === taskId) {
          const updated = tasks.find((t) => t.id === taskId);
          if (updated) setSelectedTask(updated);
        }
      } else {
        toast.error(data.error || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    }
  };

  // Handle AI suggestion
  const handleAISuggestion = async () => {
    if (!selectedTask) return;

    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'task-suggestion',
          content: `${selectedTask.title}\n\n${selectedTask.description}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAiSuggestion(data.data.result);
      } else {
        toast.error('Failed to generate suggestion');
      }
    } catch (error) {
      console.error('Error generating AI suggestion:', error);
      toast.error('Error generating suggestion');
    } finally {
      setLoadingAI(false);
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Lead: 'bg-blue-100 text-blue-800 border-blue-300',
      Support: 'bg-green-100 text-green-800 border-green-300',
      Billing: 'bg-orange-100 text-orange-800 border-orange-300',
      Renewal: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Client: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return (
      <Badge className={colors[type] || 'bg-slate-100 text-slate-800 border-slate-300'}>
        {type}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-300">{priority}</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{priority}</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-300">{priority}</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Done
          </Badge>
        );
      case 'in progress':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            In Progress
          </Badge>
        );
      case 'open':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Open
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isOverdue = (dueDate: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Internal Tasks</h1>
            <p className="text-slate-600">Manage and track internal tasks and workflows</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                  <SelectItem value="Renewal">Renewal</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks View */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks ({tasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No tasks found</div>
            ) : viewMode === 'kanban' ? (
              // Kanban Board
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Open', 'In Progress', 'Done'].map((status) => {
                  const statusTasks = tasks.filter((t) => t.status === status);
                  return (
                    <div key={status} className="flex flex-col">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-700">
                          {status} ({statusTasks.length})
                        </h3>
                      </div>
                      <div className="space-y-3 min-h-[400px]">
                        {statusTasks.map((task) => (
                          <Card
                            key={task.id}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${
                              isOverdue(task.dueDate) && task.status !== 'Done' ? 'border-red-300 bg-red-50' : ''
                            }`}
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskDialog(true);
                              setAiSuggestion(null);
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-900 mb-1">{task.title}</h4>
                                  <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                {getTypeBadge(task.type)}
                                {getPriorityBadge(task.priority)}
                              </div>
                              <div className="mt-2 text-xs text-slate-500">
                                {task.assignedTo || 'Unassigned'} • {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                {isOverdue(task.dueDate) && task.status !== 'Done' && ' ⚠️'}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {statusTasks.length === 0 && (
                          <div className="text-center text-slate-400 py-8 text-sm">No tasks</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Table View
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow
                        key={task.id}
                        className={isOverdue(task.dueDate) && task.status !== 'Done' ? 'bg-red-50' : ''}
                      >
                        <TableCell className="font-medium">{task.taskId}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs text-slate-500">{task.description.substring(0, 50)}...</div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(task.type)}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{task.assignedTo || 'Unassigned'}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          {task.dueDate ? (
                            <span className={isOverdue(task.dueDate) && task.status !== 'Done' ? 'text-red-600 font-semibold' : ''}>
                              {new Date(task.dueDate).toLocaleDateString()}
                              {isOverdue(task.dueDate) && task.status !== 'Done' && ' ⚠️'}
                            </span>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTask(task);
                              setShowTaskDialog(true);
                              setAiSuggestion(null);
                            }}
                          >
                            Open
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Task Detail Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>
              Task ID: {selectedTask?.taskId} • Type: {selectedTask?.type} • Priority: {selectedTask?.priority}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* AI Summary */}
            {selectedTask?.aiSummary && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">AI Summary</h4>
                  <p className="text-sm text-blue-800">{selectedTask.aiSummary}</p>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-slate-700">{selectedTask?.description}</p>
            </div>

            {/* AI Suggestion */}
            {aiSuggestion && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-900 mb-2">AI Suggested Action</h4>
                  <p className="text-sm text-green-800">{aiSuggestion}</p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={selectedTask?.status || ''}
                  onValueChange={(value) => selectedTask && handleUpdateTask(selectedTask.id, 'status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assign To</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  value={selectedTask?.assignedTo || ''}
                  onChange={(e) => selectedTask && handleUpdateTask(selectedTask.id, 'assignedTo', e.target.value)}
                  placeholder="Enter name..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select
                  value={selectedTask?.priority || ''}
                  onValueChange={(value) => selectedTask && handleUpdateTask(selectedTask.id, 'priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* AI Suggestion Button */}
            <Button
              variant="outline"
              onClick={handleAISuggestion}
              disabled={loadingAI}
              className="w-full"
            >
              {loadingAI ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Suggested Action
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}




